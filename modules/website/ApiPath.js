import CONFIG, { ENVIRONMENT_DATA } from "web.config";

export default class ApiPath {
  static get basePathAPI() {
    return CONFIG.NEXT_PUBLIC_API_BASE_PATH;
  }

  static get version() {
    return "/api/v1";
  }

  static get shareInfo() {
    return this.basePathAPI + this.version + `/share-info`;
  }

  static shareInfoById(id) {
    return this.basePathAPI + this.version + `/admin/codes/check/${id}`;
  }

  static adminShareInfoById(id) {
    return this.basePathAPI + this.version + `/admin/codes/redeem/${id}`;
  }

  static get generateCode() {
    return this.basePathAPI + this.version + `/codes/generate`;
  }

  static get login() {
    return this.basePathAPI + this.version + `/auth/users/login`;
  }
}
