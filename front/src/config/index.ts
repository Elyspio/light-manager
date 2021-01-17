import store from "../view/store";

export const endpoints: ReturnType<typeof createEndpoints> = createEndpoints();

function getEnv(name: string, fallback?: string): string {
    return store?.getState().environment.envs[name] ?? fallback
}

export function createEndpoints() {
    return {
        core: {
            api: getEnv("BACKEND_HOST", "http://localhost:4000"),
            socket: getEnv("BACKEND_SOCKET_HOST", "http://localhost:4000/socket.io/lights"),
        }
    }
}
