export classApplicationConfig Exception extends Error 
{   
    public statusCode: number
    Constructor(StatusCodqe: number, message: string) {
        super(message)
        this.statusCode = statusCode
        this.name = "ApplicationConfigException"
    }
}