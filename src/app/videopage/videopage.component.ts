import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
  import { IMsg, IMsgType } from 'models/IMessage.js';
  import { IPeerJs } from 'models/peerJS.js';
  import { from, Subject } from 'rxjs';
  import { mergeMap, takeUntil, tap } from 'rxjs/operators';
  import { WebSocketSubject } from 'rxjs/webSocket';
  import { environment } from 'src/environments/environment.js';
@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.scss']
})
export class VideopageComponent  implements OnInit, OnDestroy {
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
    constructor(private cdr: ChangeDetectorRef) {}
    ngOnInit(): void {
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
    setroomandname(room:string , name:string){
      
      console.log("your room is" ,room ,"your name is ",name)
 if(name){
  this.name = name;
        this.sendMessage(this.name, 'connection');
 }if(room){
    this.room = room;
    this.sendMessage(this.room, 'join');
    this.initVideo();
  
 }
 this.show=false
  }
    setName(value: string) {
      if (value) {
        this.name = value;
        this.sendMessage(this.name, 'connection');
      }
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
  ngOnDestroy() {
      this.end$.next(1);
    }
  }
