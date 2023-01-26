FROM mcr.microsoft.com/playwright:v1.16.2-focal

WORKDIR /tests

# copy project (including tests)
COPY . .

# Install dependencies
RUN npm install
# Install browsers
RUN npx playwright install chromium

# Run playwright test
CMD ["npm", "run", "regression:qa-chrome"]
