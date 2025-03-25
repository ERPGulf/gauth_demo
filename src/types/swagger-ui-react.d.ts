declare module 'swagger-ui-react' {
    import { FunctionComponent } from 'react';
  
    interface SwaggerUIProps {
      url?: string;
      spec?: object;
      docExpansion?: 'list' | 'full' | 'none';
      defaultModelsExpandDepth?: number;
    }
  
    const SwaggerUI: FunctionComponent<SwaggerUIProps>;
    export default SwaggerUI;
  }
  