
export type ToastrType = "success" | "error" | "info" | "warning";

export type ToastrContextProps  = {
    showToastr: (message: string, type: ToastrType) => void;
}