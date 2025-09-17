# ใช้ Node.js LTS
FROM node:20

# สร้าง working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# คอมไพล์ TypeScript
RUN npm run build

# expose port
EXPOSE 8000

# รันแอปในโหมด development ด้วย nodemon + ts-node
CMD ["npm", "run", "dev"]
