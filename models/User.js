import { observable } from "mobx";

export default class User{
    @observable name;
    @observable speakingLangs = [];
    @observable learningLangs = [];

    constructor(user){

    }
}