var prov1,prov2,prov3,prov4,prov5,prov6,prov7,prov8,prov9,prov10,prov11,prov12,prov13,prov14,prov15,prov16,prov17,prov18;

var lista =
[ 
    prov1 = {
        "provider_id": 1,
        "id": "433f5a04-f7c0-18f2-af65-87105b6ebd4f",
        "name": "Bartholomew",
        "email": "Bartholomew@uol_fake.com",
        "password": "$2b$08$eclbc6XAFLXSCbKG54CNBO25w6t7dnHHLCLlfD0JrWMj8Xkxx3h/i",
        "address": "R. Iataí, 33 - Casa Verde, São Paulo - SP, 02517-050",
        "description":"Garagem coberta com cameras"
    },

    prov2 = {
        "provider_id": 2,
        "id": "433f5a04-f7c0-4812-af65-87b05b1ebd4f",
        "name": "Kuma",
        "email": "Kuma@uol_fake.com",
        "password": "$2b$08$eclbc6XAFLXSCbKG54CNBasdHLCLlfD0JrWM567585677sdxx3h/i",
        "address": "R. Galiléia, 322-550 - Casa Verde Média, São Paulo - SP, 02530-000",
        "description":"Garagem descoberta"
    },
    prov3 = {
        "provider_id": 3,
        "id": "433f5a04-f7c0-4812-af65-87b01b6ebd4f",
        "name": "Jorge",
        "email": "Jorge@uol_fake.com",
        "password": "$2b$08$eclbc6XAFLXSCbKG5sdfsdfsdf43tr5erhythew34WMj8Xkxx3h/i",
        "address": "Rua Elias Gannam, 379 - Vila Bandeirantes, São Paulo - SP, 02552-040",
        "description":"Proximo ao Assai e facil acesso a av eng caetano alvares"
    },
    prov4 = {
        "provider_id": 4,
        "id": "433f5a04-f7c0-18f2-af65-87105b6ebd4f",
        "name": "Tavares",
        "email": "Tavares@uol_fake.com",
        "password": "$2b$08$eclbc6XAFLXSCbKG54CNBO25w6t7dnHHsdf345t34tsdfXkxx3h/i",
        "address": "R. Itaguaçaba, 219-45 - Vila Romero, São Paulo - SP, 02468-000",
        "description":"Voce eh jao"
    },
    prov5 = {
        "provider_id": 5,
        "id": "433f5a14-f7c0-41f2-af65-87b05b6ebd4f",
        "name": "Olavo",
        "email": "Olavo@uol_fake.com",
        "password": "$2%#gtwert689LXSCbKG54CNBO25w6t7dnHHLCLlfD0JrWMj8Xkxx3h/i",
        "address": "R. Diógenes de Lima, 283-225 - Parque Peruche, São Paulo - SP, 02535-060",
        "description":"Flamingos vivem em aguas acidas"
    },
    prov6 = {
        "provider_id": 6,
        "id": "433f5a04-f710-18f2-af65-87b05b6ebd4f",
        "name": "Tico",
        "email": "tico@uol_fake.com",
        "password": "$2b$08$eclbc6Xwerw35234668jkh25w6t7dnHHLCLlfD0JrWMj8Xkxx3h/i",
        "address": "R. Azevedo Soares, 1540 - Vila Gomes Cardim, São Paulo - SP, 03322-001",
        "description":"Garagem totalmente fechada"
    },
    prov7 = {
        "provider_id": 7,
        "id": "433f5a04-f7c0-4812-a165-87b05b6ebd4f",
        "name": "Jessica",
        "email": "Jessica@uol_fake.com",
        "password": "$2b$08$eclbc6XAFLXSCbKG52342efasdfaser234D0JrWMj8X4tkxx3h/i",
        "address": "R. Apucarana, 1412 - Vila Gomes Cardim, São Paulo - SP, 33110-001",
        "description":"Proximo a bluefit"
    },
    prov8 = {
        "provider_id": 8,
        "id": "43315a04-f1c0-48f2-af65-87b05b6ebd4f",
        "name": "Klaus",
        "email": "klaus@uol_fake.com",
        "password": "$2b$08$eclbc6XA3j5SCbKGsdwef23452LCLlfD0JrWMj8X4t44tkxx3h/i",
        "address": "R. Mossâmedes, 209-1 - Vila Santo Estevão, São Paulo - SP, 03325-060",
        "description":"Ornitorrinco bota ovo"
    },
    prov9 = {
        "provider_id": 9,
        "id": "433f5a04-fkc0-48f2-af65-87b01b6ebd4f",
        "name": "Tunico",
        "email": "tunico@uol_fake.com",
        "password": "$2b$08$eclbc62343f2433frdOk3j5sdaw3kd33lfD0JrWMj8Xkxx4t3h/i",
        "address": "R. Edmundo Xavier, 213 - Chácara Santo Antônio (Zona Leste), São Paulo - SP, 03408-040",
        "description":"Exalta Samba toca pagode e Zeca pagodinho toca samba"
    },
    prov10 = {
        "provider_id": 10,
        "id": "k3k15a04-f7c0-48f2-a165-87b05b6eb14f",
        "name": "Zania",
        "email": "zania@uol_fake.com",
        "password": "$2b$08$eclbc3j543f2433frkO2%@#2$23233lfD0JrWMj8Xkxx4t3h/i",
        "address": "Rua Pedro de Toledo, 1071 - Vila Mariana, São Paulo - SP, 04039-033",
        "description":"O trabalho em equipe é ótimo, pois permite que você coloque a culpa em outra pessoa."
    },
    prov11 = {
        "provider_id": 11,
        "id": "433f1a04-f7c0-48f2-a165-87k05b6ebd4f",
        "name": "Geremias",
        "email": "geremias@uol_fake.com",
        "password": "$2b$08$ec$c62343f2433frdOk553j5w33d#k3lfD0JrWMj8Xkxx4t3h/i",
        "address": "R. Cmte. Ismael Guilherme, 105 - Jardim Luzitania, São Paulo - SP, 04031-120",
        "description":"Em portugal os restaurantes fecham para o almoco"
    },
    prov12 = {
        "provider_id": 12,
        "id": "433fka04-f7c0-18k2-af65-87b05b6e1d4f",
        "name": "thor",
        "email": "thor@uol_fake.com",
        "password": "$2b$08$eclbc623433j533frdO25a#f4aw33d33lfD0JrWMj8Xkxx4t3h/i",
        "address": "R. Humberto I, 880 - Vila Mariana, São Paulo - SP, 04018-033",
        "description":"O importante é o que importa"
    },
    prov13 = {
        "provider_id": 13,
        "id": "433f5a04-f7c0-4812-af65-87b0k1kebd4f",
        "name": "Trevoso",
        "email": "Trevoso@uol_fake.com",
        "password": "$2b$08$eclbc62k43f243j5rdO25aasdaw$531lfD0JrWMjkXkxx4t3h/i",
        "address": "R. Tumiaru, 294-324 - Moema, São Paulo - SP, 04008-050",
        "description":"Pertim do parque ibirapuera, um tirim de espingarda"
    },
    prov14 = {
        "provider_id": 14,
        "id": "433f5a04-f7c0-481k-af65-87b0k16ebd4f",
        "name": "Pitero",
        "email": "pitero@uol_fake.com",
        "password": "$2b$08$eclbc62343f243j5rdO25aasdaw$531lkD0JrWMj8Xkxx4t3h/i",
        "address": "R. Eng. Rebouças, 483-401 - Cerâmica, São Caetano do Sul - SP, 09540-000",
        "description":"Quanto maior seu esforço maior sera seu fracasso"
    },
    prov15 = {
        "provider_id": 15,
        "id": "433f5a04-f7c0-48k2-af65-87b0516ebk4f",
        "name": "Rodrigo",
        "email": "rodrigo@uol_fake.com",
        "password": "$2b$08$eclbc62343f243j5rdOk5aasdaw$531lfk0JrWMj8Xkxx4t3h/i",
        "address": "R. Maria Teixeira Mourão Maresti, 164-222 - Cerâmica, São Caetano do Sul - SP, 09540-780",
        "description":"Seu maior problema eh voce"
    },
    prov16 = {
        "provider_id": 16,
        "id": "433f5a04-k7c0-4812-ak65-87b0516ebd4f",
        "name": "Joaquim",
        "email": "joaquim@uol_fake.com",
        "password": "$2b$08$eclbck2343f243j5rdO25aasdaw$531lfD0JrWMj8Xkxx4t3h/i",
        "address": "R. Serafim Carlos, 328 - Osvaldo Cruz, São Caetano do Sul - SP, 09570-410",
        "description":"Acreditar que voce pode ja eh meio caminho errado"
    },
    prov17 = {
        "provider_id": 17,
        "id": "433f5ak4-f7c0-4812-af65-87b0516ebk4f",
        "name": "Thamara",
        "email": "thamara@uol_fake.com",
        "password": "$2b$08$eclbc62343f243j5rdO25kasdaw$531lfD0JkWMj8Xkxx4t3h/i",
        "address": "R. Padre Mororó, 392 - São José, São Caetano do Sul - SP, 09581-040",
        "description":"Desistir sempre eh a melhor opcao"
    },
    prov18 = {
        "provider_id": 18,
        "id": "433f5a04-f7c0-4k12-af65-87b0516ebd4k",
        "name": "Caiky",
        "email": "caiky@uol_fake.com",
        "password": "$2b$08$eclbc62343f243j5rdO25kasdaw$531lfk0JrWMj8Xkxx4t3h/i",
        "address": "R. Bertolino da Cunha, 171 - Osvaldo Cruz, São Caetano do Sul - SP, 09540-300",
        "description":"Se o videogame atrapalha os estudos, pare de estudar."
    }
]
