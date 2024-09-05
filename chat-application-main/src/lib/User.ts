 type User = {
    userName: string,
    name: string,
    socketId: string,
    password: string,
    state: string,
    nameColor: string,
    fontColor: string,
    backgroundColor: string,
    img: string,
    private: string[],
    like: number,
    block: string[],
    chatBlock: boolean,
    infoBlock: boolean,
    country: string,
    room: string,
    role: string,
    ip: string,
    device: string,
    updatedAt: string,
    _id: string
  }

  export default User