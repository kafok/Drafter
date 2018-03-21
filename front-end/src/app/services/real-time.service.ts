import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../environments/environment';

@Injectable()
export class RealTimeService {

  private stompClient;
  private meeting: number;
  private user: string;
  private models: Array<any>;


  constructor() { }

  public getUser(): string {
    return this.user;
  }


  public connect(meeting: number, callback: Function = null) {
    this.meeting = meeting;
    this.user= this.user ? this.user : 'Unnamed';
    this.models = new Array<any>();

    var ws = new SockJS(environment.baseWS);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      if(callback)
        callback(frame);
    });
  }

  public register(name: string, model: Array<any>, callback: Function = null) {
    this.models[name] = {model: model, callback: callback};
  }

  public subscribe() {
    var that = this;
    that.stompClient.subscribe("/meeting/" + this.meeting, (msg) => {
      if(msg.body) {
        var obj: Model = JSON.parse(msg.body);
        var model: any = this.models[obj.name].model;
        var callback: Function = this.models[obj.name].callback;

        switch(obj.type) {
          case "push":
            model.push(obj.model);
            break;

          case "pop":
            model.pop();
            break;
            
          case "revert":
            break;
          
          case "set":
            model.splice(0, model.length);
            model.push(obj.model);
            break;
            
          case "unset":
            model.splice(0, model.length);
            break;
        }

        if(callback)
          callback(obj);
      }
    });
  }

  public send(uri: string, type: WSResponseType, name: string, model: any, data: any = null) {
    if(!data)
      data = {};

    data.user = this.user;

    var a = new Model(type, name, model, data);
    var json = JSON.stringify(a);
    this.stompClient.send('/app' + uri + this.meeting, {}, json);
  }

}

export enum WSResponseType {
    PUSH = 'push',
    POP = 'pop',
    REVERT = 'revert',
    SET = 'set',
    UNSET = 'unset'
}

export class Model {
  constructor(public type: string, public name: string, public model: any, public data: Object) { }
}