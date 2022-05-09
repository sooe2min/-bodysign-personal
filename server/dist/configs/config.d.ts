export declare const config: () => {
    database: {
        type: string;
        host: string;
        port: string;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        entities: string[];
    };
    awsBucketName: string;
    port: string;
    jwtSecret: string;
    redirectURL: string;
    userAuthLogin: string;
    trainerAuthLogin: string;
    corsOptions: {
        origin: (origin: string | undefined, cb: (err: Error | null, allow?: boolean) => void) => void;
        methods: string[];
        credentials: boolean;
    };
};
