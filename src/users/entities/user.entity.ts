import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'


//para decir que va hacer una entidad en la base de datos
@Entity()
export class User {

    //columnas
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({default: true})
    isActive: boolean;



}
