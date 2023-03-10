'use strict'

import fetch from "node-fetch";
import config from '../../config.js';

const functions = {
  getListFromAPI: async function () {
    const path = '/search/sgsg';
  
    const res = await fetch(`${config.source.url}${path}`, {
      compress: false,
      timeout: 60e3, // 60s timeout as default
      follow: 0,
      headers: {
        'content-type': 'application/json'
      }
    }).catch(err => {
      console.log('Some error!');
      throw err
    })
    // 7. Return response from external API
      console.log('Response from external API');
      return res.json();
    
  }
}

export default functions;

