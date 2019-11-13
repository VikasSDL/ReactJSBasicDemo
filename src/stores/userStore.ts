import { action, observable } from 'mobx';

import { CreateOrUpdateUserInput } from '../services/user/dto/createOrUpdateUserInput';
import { EntityDto } from '../services/dto/entityDto';
import { GetRoles } from '../services/user/dto/getRolesOuput';

import { PagedResultDto } from '../services/dto/pagedResultDto';

import { GetAllUserRequest } from "../services/user/dto/Request/getAllUserRequest";
import { GetAllUserResponse } from "../services/user/dto/Response/getAllUserResponse";

import userService from '../services/user/userService';
import sessionService from '../services/session/sessionService';

class UserStore {

    @observable users!: PagedResultDto<GetAllUserResponse>;
    @observable filters!: GetAllUserRequest;
    @observable editUser!: CreateOrUpdateUserInput;
    @observable roles: GetRoles[] = [];

    @action
    async getAll(getAllUserRequest: GetAllUserRequest) {
        let result = await userService.getAll(getAllUserRequest);
        this.users = result;
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
        var userid = sessionService.getLoginUserId();
        this.filters = {
            emailAddress: '', firstName: '', lastName: '', departmentId: '', groupId: '', jobCodeId: '', searchOnGroupId: '', pageIndex: 1, pageSize: 10, requesterUserId: userid, sortExp: '', status: true
        };
    }

    @action
    public setFilter(getAllUserRequest: GetAllUserRequest) {
        this.filters = getAllUserRequest;
    }
    /*********************************/
}

export default UserStore;
