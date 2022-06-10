 import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
  import { IMsg, IMsgType } from 'models/IMessage.js';
  import { IPeerJs } from 'models/peerJS.js';
  import { from, Subject } from 'rxjs';
  import { mergeMap, takeUntil, tap } from 'rxjs/operators';
  import { WebSocketSubject } from 'rxjs/webSocket';
  import { environment } from 'src/environments/environment.js';
import { UserService } from '../services/user.service.js';
@Component({
  selector: 'app-main-client',
  templateUrl: './main-client.component.html',
  styleUrls: ['./main-client.component.scss']
})
export class MainClientComponent implements OnInit, OnDestroy {
  @ViewChild("video", { static: true }) audio: any;
  player: any = document.getElementById("video");

  show=true;
  title = 'frontend';
  msg: string = '';
  messages: IMsg[] = [];
  end$ = new Subject();
  socket = new WebSocketSubject<IMsg>(environment.url);
  _room = '';
  room = '';
  _name: string = '';
  name: string = '';
  localStream!: MediaStream;
  remoteStreams: MediaStream[] = [];
  myPeer!: IPeerJs;
  peers: {
    [id: string]: any;
  } = {};
  id: string = '';
  remoteNames: string[] = [];
  constructor(private cdr: ChangeDetectorRef,private userservice:UserService) {}
  nom!: string ; 
  prenom!: string ; 
  image!:any  ; 
  takeemployee(){
    const tokenloc = localStorage.getItem('access_token');
    var token : any = tokenloc;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenInfo = JSON.parse(window.atob(base64));
    this.userservice.getemployee(tokenInfo.employee_id).subscribe(res=>{
   // this.image=res.image;
   this.nom=res.nom;
   this.name = res.nom;

   this.prenom=res.prenom;
  this.image="http://localhost:3000/"+res.image.toString().split("\\")[0]+"/"+
  res.image.toString().split("\\")[1]+"/"+res.image.toString().split("\\")[2];
  console.log(res.image)
  console.log(this.image)
    })}
  ngOnInit(): void {
    this.takeemployee()
      this.sendMessage(this.name, 'connection');
  this.room ="room1";
  this.sendMessage(this.room, 'join');
  this.initVideo();


    this.socket.pipe(takeUntil(this.end$)).subscribe(
      (m) => {
        switch (m.type) {
          case 'connection':
            if (m.message === 'Welcome') {
              this.id = m.id;
            }
            break;
          case 'message':
            this.messages.push(m);
            break;
          case 'available':
            const call = this.myPeer.call(m.id, this.localStream);
            this.connectToNewUser(call);
            break;
          case 'leave':
            this.peers[m.id]?.close();
            break;
        }
      },
      (err) => {
        console.error(err);
        this.name = '';
        this.room = '';
      },
      () => console.info('CLOSED')
    );
  }

  initVideo() {
    console.log(this.remoteNames)
    from(navigator.mediaDevices.getUserMedia({ audio: false, video: true }))
      .pipe(
        tap((stream) => (this.localStream = stream)),
        mergeMap(() =>
          // @ts-ignore
          from(import('../../assets/peer.js'))
        )
      )
      .pipe(takeUntil(this.end$))
      .subscribe((data) => {
        this.myPeer = new data.default(this.name) as IPeerJs;
        this.myPeer.on('open', (id) => {
          console.log(id);
        });
        this.myPeer.on('call', (call) => {
          call.answer(this.localStream);
          this.connectToNewUser(call);
        });
      });
  }

  startCall() {
    this.sendMessage(this.name, 'available');
  }

  sendMessage(message: string, type: IMsgType = 'message') {
    this.socket.next({ type, id: this.room, message });
    this.msg = '';
  }
  setRoom(value: string) {
    if (value) {
      this.room = value;
      this.sendMessage(this.room, 'join');
      this.initVideo();
    }
  }

  connectToNewUser(call: any) {
    console.log(call.peer);
    call.on('stream', (stream: MediaStream) => {
      this.remoteStreams.push(stream);
      this.peers[call.peer] = call;
      this.remoteNames = Object.keys(this.peers);
      console.log(this.remoteNames);
    });
    call.on('close', () => {
      this.peers[call.peer].close();
    });

    console.log(this.peers);
  }

  ngOnDestroy(){
    this.end$.next(1);
  }
 stopmic(){
    this.audio.play();
    this.player.play();
}
 
}
