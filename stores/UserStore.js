import { observable, action } from "mobx";
import User from "../models/User";

class UserStore{
    @observable user = {};

    @action setCurrentUser = user => this.user = new User(user);

    @action setUserSpeakingLanguages = languages => this.user.speakingLanguages = languages;
}

export default new UserStore();