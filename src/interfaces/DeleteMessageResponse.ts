export default interface ModifyMessageResponse {
  deleteUser: {
    message: string;
    data: {
      id: string;
      username: string;
    }
  }
}
