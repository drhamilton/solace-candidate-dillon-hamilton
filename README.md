## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```

## Next Steps & Improvements

### Performance Enhancements

- **Pagination**: Implement server-side pagination to handle large datasets efficiently
- **Caching Strategy**: Add Redis or in-memory caching for frequently accessed data

### UI/UX Improvements

- **Mobile Responsiveness**: Optimize for mobile devices
- **Advanced Filtering & Sorting**: Add sortable columns and dedicated filter UI
- **Search Improvements**: Separate search inputs for different fields (city/state, specialty, name)

### Code Quality

- **Testing**: Add unit, integration, and E2E tests
- **Linting & Formatting**: Configure ESLint and Prettier with pre-commit hooks
- **Type Strictness**: Enable strict mode and add explicit return types
- **Code Coverage**: Set up coverage reporting and minimum thresholds

### Security & Compliance

- **Rate Limiting**: Implement API rate limiting to prevent abuse
- **Input Sanitization**: Add validation and sanitization for all user inputs
- **SQL Injection Prevention**: Audit all database queries for vulnerabilities

### DevOps & Infrastructure

- **CI/CD Pipeline**: Set up automated testing and deployment
- **Monitoring & Alerting**: Add error tracking (Sentry) and performance monitoring

### Additional Features

- **Loading States**: Add skeleton loaders during data fetching
- **Error Boundaries**: Implement React error boundaries for graceful error handling
- **Accessibility**: Continue improving ARIA labels and keyboard navigation
- **Analytics & Logging**: Track user interactions and application errors
