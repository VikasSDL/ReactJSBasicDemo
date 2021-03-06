import { action, observable } from 'mobx';

import { CreateOrUpdateUserInput } from '../services/user/dto/createOrUpdateUserInput';
import { EntityDto } from '../services/dto/entityDto';
import { GetRoles } from '../services/user/dto/getRolesOuput';

import { PagedResultDto } from '../services/dto/pagedResultDto';

import { GetAllUserRequest } from "../services/user/dto/Request/getAllUserRequest";
import { GetAllUserResponse } from "../services/user/dto/Response/getAllUserResponse";
import { GetJobRolesResponse } from '../services/user/dto/Response/getJobRolesResponse';
import { GetUserEntityListRequest } from "../services/user/dto/Request/getUserEntityListRequest";
import { GetUserEntityListResponse } from "../services/user/dto/Response/getUserEntityListResponse";

import userService from '../services/user/userService';
import sessionService from '../services/session/sessionService';


class UserStore {

    @observable users!: PagedResultDto<GetAllUserResponse>;
    @observable filters!: GetAllUserRequest;
    @observable UserGroup!: GetUserEntityListRequest;
    @observable userentity!: PagedResultDto<GetUserEntityListResponse>;

    @observable editUser!: CreateOrUpdateUserInput;
    @observable roles: GetRoles[] = [];
    @observable userjobroles!: PagedResultDto<GetJobRolesResponse>;
    @observable groups :any;

  

    @action
    async getAll(getAllUserRequest: GetAllUserRequest) {      
        let result = await userService.getAll(getAllUserRequest);
        this.users = result;
    }

    @action
    async getEntityList(getUserEntityListRequest: GetUserEntityListRequest) {       
        var userid = sessionService.getLoginUserId();
        getUserEntityListRequest.RequesterUserId = userid;
        let result = await userService.getEntityList(getUserEntityListRequest);
        this.userentity = result;      
        return result;
    }
   
    @action
    async create(createUserInput: CreateOrUpdateUserInput) {
        let result = await userService.create(createUserInput);
        this.users.items.push(result);
    }

    @action
    async update(getAllUserRequest: GetAllUserRequest) {
        //let result = await userService.update(updateUserInput);
        //this.users.items = this.users.items.map((x: GetUserOutput) => {
        //    if (x.id === updateUserInput.id) x = result;
        //    return x;
        //});
    }

    @action
    async delete(entityDto: EntityDto) {
        //await userService.delete(entityDto);
        //this.users.items = this.users.items.filter((x: GetUserOutput) => x.id !== entityDto.id);
    }

    @action
    async getRoles() {
        let result = await userService.getRoles();
        this.roles = result;
    }

    @action
    async get(entityDto: EntityDto) {
        let result = await userService.get(entityDto);
        this.editUser = result;
    }

    @action
    async createUser() {
        this.editUser = {
            id: 0,
            firstName: '',
            lastName: '',
            userType: '',
            department: '',
            emailAddress: '',
            isActive: true,
            password: '',
            roleNames: []           
           
        };
        this.roles = [];
    }
  
    /* FILTERS ***/
    @action
    async initFilter() {
        this.UserGroup = {RequesterUserId:'',GroupId:'',SearchPhrase:''};
        var userid = sessionService.getLoginUserId();
        await this.getEntityList({ RequesterUserId: userid, SearchPhrase: '' ,GroupId:''});
        await  this.GetUserJobRoles();        
        this.filters = {
            emailAddress: '', firstName: '', lastName: '', departmentId: '', groupId: '', jobCodeId: '', searchOnGroupId: '', pageIndex: 1, pageSize: 10, requesterUserId: userid, sortExp: '', status: true,
            hiringDateFrom: null, hiringDateTo: null, roleChangeDateFrom: null, roleChangeDateTo: null
        };
    }
   /*** LOOKUP *****/
   @action
   async GetUserJobRoles() {    
       let result = await userService.getJobRoles();   
       this.userjobroles = result;
   }
   @action
   async addEditUser(CreateOrUpdateUserInput:CreateOrUpdateUserInput) {    
      
       let result = await userService.addEditUser(CreateOrUpdateUserInput);   
       this.editUser = result;
   }
}

export default UserStore;
