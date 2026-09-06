import type { operations } from "./api-types";

/** Every generated FastAPI operationId — one key per endpoint in routes.json. */
export type OperationId = keyof operations;

type ResponseContent<T> = T extends { content: { "application/json": infer R } } ? R : void;

/** Body of the first successful response (200 or 201) for a given operation. */
export type ApiResponse<Op extends OperationId> = operations[Op]["responses"] extends {
  200: infer R;
}
  ? ResponseContent<R>
  : operations[Op]["responses"] extends { 201: infer R }
    ? ResponseContent<R>
    : void;

/** JSON request body for a given operation. */
export type ApiJsonBody<Op extends OperationId> = operations[Op] extends {
  requestBody?: { content: { "application/json": infer B } };
}
  ? B
  : never;

/** multipart/form-data request body for a given operation (file uploads). */
export type ApiFormBody<Op extends OperationId> = operations[Op] extends {
  requestBody?: { content: { "multipart/form-data": infer B } };
}
  ? B
  : never;

/** Query-string params for a given operation. */
export type ApiQuery<Op extends OperationId> = operations[Op]["parameters"] extends {
  query?: infer Q;
}
  ? Q
  : never;

/** Path params for a given operation. */
export type ApiPath<Op extends OperationId> = operations[Op]["parameters"] extends {
  path?: infer P;
}
  ? P
  : never;
