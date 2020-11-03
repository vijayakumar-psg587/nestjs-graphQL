import { CustomExceptionModel } from '../../exceptions/custom-exception.model';
import { AppUtilService } from 'src/modules/shared/services/app-util/app-util.service';

export class CustomExceptionBuilder {
    private customExceptionModel: CustomExceptionModel;
    constructor() {
        this.customExceptionModel = {
            status: 0,
            message: '',
            type: '',
            code: '',
            timestamp: '',
            stack: '',
            name: '',
        };
    }

    setName(name: string): CustomExceptionBuilder {
        this.customExceptionModel.name = name;
        return this;
    }

    setStatus(status: number): CustomExceptionBuilder {
        this.customExceptionModel.status = status;
        return this;
    }
    setMessage(message: string): CustomExceptionBuilder {
        this.customExceptionModel.message = message;
        return this;
    }
    setType(type: string): CustomExceptionBuilder {
        this.customExceptionModel.type = type;
        return this;
    }
    setCode(code: string): CustomExceptionBuilder {
        this.customExceptionModel.code = code;
        return this;
    }
    setTimestamp(): CustomExceptionBuilder {
        this.customExceptionModel.timestamp = AppUtilService.getDefaultTime();
        return this;
    }

    build(): CustomExceptionModel {
        return this.customExceptionModel;
    }
}
