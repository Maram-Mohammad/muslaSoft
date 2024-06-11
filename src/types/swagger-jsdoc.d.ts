// src/types/swagger-jsdoc.d.ts
declare module 'swagger-jsdoc' {
    import { OpenAPIV3 } from 'openapi-types';
  
    interface Options {
      swaggerDefinition: OpenAPIV3.Document;
      apis: string[];
    }
  
    function swaggerJsDoc(options: Options): OpenAPIV3.Document;
  
    export = swaggerJsDoc;
  }
  