import { Injectable } from "@nestjs/common";
@Injectable()
export class ConfigRoutersService {
    public static API_OWNER_CREATE_ROUTE : string = 'api/create';
    public static API_OWNER_CREATE_AJAX_ROUTE : string = 'owner/api/create';
}