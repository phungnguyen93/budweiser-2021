import Axios from "axios";
import ApiPath from "modules/website/ApiPath";
import Qr from "plugins/qr/Qr";
import { Component, createContext, useState } from "react";

const ApiContext = createContext();

class ApiProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleIndex: 0,
      list: [],
      urlBlobImageSharing: "",
      token: "",
    };

    this.allValue = {
      choosingTitle: this.choosingTitle,
      get: this.get,
      post: this.post,
      put: this.put,
      getWithToken: this.getWithToken,
      genQrCode: this.genQrCode,
      adminToken: this.adminToken,
    };

    this.init();
  }

  init = (params) => {
    console.log("init");
    this.getTitle();
  };

  genQrCode = async (id) => {
    const blob = await Qr.toBlob(id);

    const urlCreator = window.URL || window.webkitURL;
    const url = urlCreator.createObjectURL(blob);

    return await this.setState({ urlBlobImageSharing: url });
  };

  getTitle = async (params) => {
    const res = await this.get(ApiPath.shareInfo);
    console.log(res);

    if (res)
      this.setState({
        list: res,
      });
  };

  getHeader = (options) => {

    options = options || {};

    const headers = options.hasOwnProperty('headers') ? options['headers'] : {};

    const token = options.hasOwnProperty('token') ? options['token'] : "";
    if (token) headers["Authorization"] = "Bearer " + token;

    return headers;
  }

  adminToken = (params) => {
    this.setState({ token: params });
  };

  handleResponse = (params) => {
    if (params) {
      if (params.data) {
        if (params.status) if (params.data.data) return params.data.data;
      }
    }
    console.log(params);
    return params;
  };

  get = async (url, options) => {
    options = options || {};

    const header = this.getHeader(options);

    let res;
    try {
      res = await Axios({
        url: url,
        method: "GET",
        headers: header
      });
    } catch (error) {
      console.log(error);
    }

    res = this.handleResponse(res);

    return res;
  };

  getWithToken = async (url, options, token) => {
    console.log(token);
    options = options || {};
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    if (token) headers["Authorization"] = "Bearer " + token;
    let res;
    try {
      res = await Axios({
        url: url,
        method: "GET",
        headers,
      });
    } catch (error) {
      console.log(error);
    }

    res = this.handleResponse(res);

    return res;
  };

  /**
   *
   * @param {String} url
   * @param {Object} options
   * @param {Object} options.params
   *
   */
  post = async (url, options) => {
    options = options || {};

    const params = options.hasOwnProperty("params") ? options["params"] : {};
    
    const header = this.getHeader(options);

    let res;
    try {
      res = await Axios({
        url: url,
        method: "POST",
        data: params,
        headers: header
      });
    } catch (error) {
      console.log(error);
    }

    res = this.handleResponse(res);

    return res;
  };

  /**
   *
   * @param {String} url
   * @param {Object} options
   * @param {Object} options.params
   *
   */
  put = async (url, options, token) => {
    options = options || {};

    const params = options.hasOwnProperty("params") ? options["params"] : {};

    const header = this.getHeader(options);

    // const headers = {
    //   "Content-Type": "application/x-www-form-urlencoded",
    // };
    // if (token) headers["Authorization"] = "Bearer " + token;
    let res;
    try {
      res = await Axios({
        url: url,
        method: "PUT",
        data: params,
        headers: header,
      });
    } catch (error) {
      console.log(error);
    }

    res = this.handleResponse(res);

    return res;
  };

  choosingTitle = (index) => {
    this.setState({
      titleIndex: index,
    });
  };

  
  render() {
    return (
      <ApiContext.Provider
        value={{
          ...this.state,
          ...this.allValue,
        }}
      >
        {this.props.children}
      </ApiContext.Provider>
    );
  }
}

export default ApiProvider;

export { ApiContext, ApiProvider };
