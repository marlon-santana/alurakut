import { SiteClient } from 'datocms-client';


export default async function recebedorDeRequests(request,response) {


    if(request.method === 'POST') {
        const TOKEN = '4bd280a1003790dd29b6204ca464a2';
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
        itemType:"976165",
        ...request.body,
        //title:"comunidade teste",
        //imageUrl:"https://github.com/marlon-santana.png",
        //creatorSlug:"marlon"
    })
    console.log(registroCriado);

    response.json({
        dados:'algum dado qualquer',
        registroCriado: registroCriado,
     })
    }
    return;
}