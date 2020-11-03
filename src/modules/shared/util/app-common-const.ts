export const APP_CONST = {
    CORS: {
        ACCESS_CONTROL_ALLOW_METHODS: ['GET', 'POST', 'PUT', 'DELETE'],
        ACCESS_CONTROL_ALLOW_HEADERS: ['Origin', 'Referrer', 'app_name', 'Content-type', 'Accept'],
        ACCESS_CONTROL_ALLOW_ORIGIN: ['*'],
    },
    HEADERS: {
        FID_LOG_TRACKING_ID: 'FID-LOG-TRACKING-ID',
        FID_USER_ID: 'FID-USER-ID',
        FID_USER_TYPE: 'FID-USER-TYPE',
        FID_PRINCIPAL_ROLE: 'FID-PRINCIPAL-ROLE',
        FID_CONSUMER_APP_PROCESS: 'FID-CONSUMER-APP-PROCESS',
        REDACT: ['request.headers.host', 'request.headers.authorization'],
        WHITELIST_HEADER_URLS: ['health-check', 'swagger', 'grpahql'],
        MANDATORY_HEADERS_NAME_LIST: ['FID-LOG-TRACKING-ID', 'FID-USER-TYPE', 'FID-CONSUMER-APP-PROCESS', 'FID-PRINCIPAL-ROLE'],
        HEADERS_KEYS: {
            LOG_TRACKING_ID: 'LOG-TRACKING-ID',
            APP_NAME_KEY: 'APP-NAME',
        },
    },
    REQUEST: {
        REDACT: ['request.body.test_redact', 'request.remotePort'],
    },
    CHAR: {
        COMMA: ',',
        SLASH: '/',
        COLON: ':',
        SEMI_COLON: ';',
        HYPHEN: '-',
        AT: '@',
        UNDERSCORE: '_',
        QUESTION: '?',
        FULL_STOP: '.',
    },

    COMMON: {
        APP_ENV_DEV: 'dev',
        APP_ENV_PROD: 'prod',
        APP_NAME: 'fastify-auth-sample',
        DEFAULT_DATE_TIME_FORMAT: 'HHHH-MM-DD hh:mm:ss:SSSS',
        DEFAULT_DNS_FORMAT: 'yyyy-MM-dd HH:mm:ss.SSSS',
        USER_ID: 'APP-ID',
        INVALID_DATE: 'Invalid Date',
        REGEX: {
            USER_ID: /^[aA]{1}[0-9]{6}$/,
        }
    },
    AXIOS: {
        DEFAULT_BODY_LENGTH: 2000,
        DEFAULT_CONTENT_LENGTH: 2000,
        DEFAULT_REDIRECTS: 3,
        DEFAULT_XSRF_HEADER_TOKEN: 'X-XSRF-TOKEN',
        DEFAULT_XSRF_HEADER_COOKIE: 'XSRF-TOKEN',
        DEFAULT_DECOMPRESS_BOOL: false,
        DEFAULT_WTIH_CRED_BOOL: true,
        DEFAULT_TIMEOUT: 3000,
        DEFAULT_URL: 'https://jsonplaceholder.typicode.com/posts',
    },
    ERROR: {
        TYPE: {
            VALIDATION: 'ValidationError',
            DATABASE: 'DatabaseError',
            INPUT: 'RequestInputError'
        },
        MESSAGES: {
            VALIDATION_ERROR: 'Params/Object/Input provided are incorrect - Please revisit',
            DATABASE_QUERY_ERROR: 'Cannot execute query in database',
            CORS_ERROR: 'Current domain is not authorized to access the resources'
        }
    },
    LOGGER: {
        REDACT_VAL: '***',
    }
};
