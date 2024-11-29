export interface LoginDto {
    username:string
    password:string
}

export interface ProfileDto {
    id:string
}

export interface RegisterDto extends LoginDto {
    isAdmin:boolean
}