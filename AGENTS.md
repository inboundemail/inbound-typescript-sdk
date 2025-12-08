# Agent Guidelines

## Commands

- **Build:** `pnpm build`
- **Lint:** `pnpm lint` (runs eslint, tsc, attw, publint)
- **Format:** `pnpm format` (eslint --fix + prettier)
- **Test all:** `pnpm test` (starts Prism mock server automatically)
- **Test single file:** `pnpm test tests/api-resources/emails.test.ts`
- **Test single case:** `pnpm test -t "test name pattern"`

## Code Style

- **Formatting:** Prettier with single quotes, trailing commas, 110 char width
- **Imports:** Use `import type` for type-only imports; use relative imports in src/ (not `inboundemail/...`)
- **Naming:** PascalCase for classes/interfaces, camelCase for functions/variables, kebab-case for files
- **Types:** Response types as `<Resource><Action>Response`, params as `<Resource><Action>Params`
- **Strict TS:** All strict options enabled including `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`

## Error Handling

- Extend `InboundError` for custom errors; use `APIError.generate()` for HTTP errors
- Throw specific error classes: `BadRequestError`, `AuthenticationError`, `NotFoundError`, etc.

## Testing

- Tests use Prism mock server on `http://localhost:4010`
- Test files: `tests/api-resources/<resource>.test.ts`
- Use `client.<resource>.<method>()` pattern; test both `asResponse()` and direct await
