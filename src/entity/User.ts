import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    role!: string

    @Column()
    email!: string

    @Column()
    passwordHash!: string
}
