import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
   
    openapi: '3.0.0',
    

    info: {
      title: 'Gym / Fitness Class Booking API',
      version: '1.0.0',
      description: 'A booking system where a gym publishes class sessions and members book a spot, with trainers managing the schedule.',
      contact: {
        name: 'Backend Team',
      },
    },
    
    servers: [
      {
       url: 'https://focused-acceptance-production-26c4.up.railway.app', // رابط ريلواي
        description: 'Production Server' ,
      },
      // when making refresh for swagger we want to be in Railway not localhost/3000
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server',
      },
    ],
    
    
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    
   
  },
  
 
  apis: [
    './src/routes/*.ts',       
    './src/models/*.ts',       
  ],
};

 
export const swaggerSpec = swaggerJsdoc(options);