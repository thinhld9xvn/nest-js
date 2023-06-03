import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ConfigService } from 'src/config/config.service';
import { Localize } from 'src/interfaces/localize.interface';
@Injectable()
export class NestPackerService extends ConfigService {
  private pk_localizes = [];
  get_dirname() : string {
    return [process.cwd(), 'configs', 'jsons'].join('/');
  }
  get_fs_enqueue() : string {
    return [this.get_dirname(), 'enqueues.json'].join('/');
  }
  get_registered_styles() : string {
    const enqueuesData = JSON.parse(fs.readFileSync(this.get_fs_enqueue()).toString());
    const stylesRegistered = enqueuesData[0]['globals']['styles'];    
    return stylesRegistered.map((href : string) => `<link rel="stylesheet" type="text/css" href="/public/${href}" />`)
                          .join('');
  } 
  get_registered_scripts() : string {
    const enqueuesData = JSON.parse(fs.readFileSync(this.get_fs_enqueue()).toString());
    const scriptsRegistered = enqueuesData[0]['globals']['scripts'];    
    return scriptsRegistered.map((src : string) => `<script type="text/javascript" src="/public/${src}"></script>`)
                            .join('');
  }
  set_localize(key : string, value : any, footerType : boolean = false) {
    const index = this.pk_localizes.findIndex((item : Localize)=> item.key === key );
    if ( index !== -1 ) {
      this.pk_localizes[index] = {key, value, footerType};
      return;
    }
    this.pk_localizes.push({key, value, footerType});
  }
  get_script_localizes(footer : boolean = false) {
    return this.pk_localizes.map(({key, value, footerType}) => {
      if ( footerType !== footer ) return null;
      let objectKey = '';       
      if ( typeof(value) === 'object' ) {
        objectKey = JSON.stringify(value);
      }
      else {
        objectKey = value;
      }
      return `<script type="text/javascript">var ${key} = ${objectKey}</script>`;
    }).filter(l => l !== null);
  }
  get_packer_head() : string {
    return `
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      ${this.get_registered_styles()}
      ${this.get_script_localizes(false)}
    `;
  }
  get_packer_foot() : string {
    return `
      ${this.get_script_localizes(true)}
      ${this.get_registered_scripts()}
    `;
  }
  pack() : object {
    return {
      packer_head : this.get_packer_head(),
      packer_foot : this.get_packer_foot(),
    }
  }
}