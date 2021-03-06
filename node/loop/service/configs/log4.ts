/**
 * Created by zhoucaiguang on 2017/3/8.
 */



export const log4Config = {
    "appenders": [
        {
            "type": "clustered",
            "appenders": [
                {
                    "type": "dateFile",
                    "filename": "log/access.log",
                    "pattern": "-yyyy-MM-dd",
                    "category": "http"
                },
                {
                    "type": "file",
                    "filename": "log/app.log",
                    "maxLogSize": 10485760,
                    "numBackups": 3
                },
                {
                    "type": "logLevelFilter",
                    "level": "ERROR",
                    "appender": {
                        "type": "file",
                        "filename": "log/errors.log"
                    }
                }
            ]
        }
    ]
};