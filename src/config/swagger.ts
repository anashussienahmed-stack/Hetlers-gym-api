import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    // 1. إصدار OpenAPI
    openapi: '3.0.0',
    
    // 2. المعلومات الأساسية لمشروع الجيم
    info: {
      title: 'Gym / Fitness Class Booking API',
      version: '1.0.0',
      description: 'A booking system where a gym publishes class sessions and members book a spot, with trainers managing the schedule.',
      contact: {
        name: 'Backend Team',
      },
    },
    
    // 3. روابط السيرفرات
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server',
      },
      {
        url: 'https://your-app-name.onrender.com', // استبدل هذا برابط Render أو Railway الخاص بك لاحقاً
        description: 'Production Server',
      },
    ],
    
    // 4. إعدادات الـ JWT (Bearer Auth)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    
    // ملاحظة: تم إزالة الـ security العامة من هنا لكي لا تطلب Token في مسارات الـ Login والـ Register.
    // الأفضل تحديد الحماية فوق الـ Routes المحمية فقط.
  },
  
  // 5. المسارات التي سيبحث فيها Swagger عن التعليقات
  apis: [
    './src/routes/*.ts',       // للبحث عن التوثيق في مسارات الـ API
    './src/models/*.ts',       // للبحث عن الـ Schemas
  ],
};

// تصدير الإعدادات
export const swaggerSpec = swaggerJsdoc(options);