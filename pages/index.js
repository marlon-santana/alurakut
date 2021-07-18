

import  Box  from '../src/components/Box'
import  MainGrid  from '../src/components/MainGrid'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfilesRelations';
import { useState, useEffect } from 'react';


function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />


        <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul> 
        {/*seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
            <a href={`https://github.com/${itemAtual}.png`}>
              <img src={itemAtual.image} />
              <span>{itemAtual.title}</span>
            </a>
            </li>
          )
        })*/}
        </ul> 
        </ProfileRelationsBoxWrapper>
  );
}






export default function Home() {
  const githubUser = 'marlon-santana';
    const [comunidade, setComunidade] = useState([])
    
  const pessoasFavoritas = ['juunegreiros',
  'omariosouto',
   'peas', 
   'rafaballerini', 
   'marcobrunodev',
  'felipefialho']

const [seguidores,setSeguidores] = useState([]);

  useEffect(() => {
  fetch('https://api.github.com/users/marlon-santana/followers')
  .then((respostaDoServidor) => {
  return respostaDoServidor.json();
})
  .then((respostaCompleta) => {
    setSeguidores(respostaCompleta);
  })
  // API GraphQl
  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': '20c8b44b26806dd55940af82e6b9de',
      'Content-Type': 'aplication/json',
      'Accept': 'aplication/json',
    },
    body: JSON.stringify({ "query": `query {
      allCommunities {
        title
        id
        imageUrl
        creatorSlug
      }
      
    }`})
     })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesVindaDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindaDoDato)

      setComunidade(comunidadesVindaDoDato)
     
   
  })
},[])




  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profile" style={{ gridArea: 'profile'}}>
      <ProfileSidebar githubUser={'marlon-santana'} />
      </div>

        <div className="welcome" style={{ gridArea: 'welcome'}}>
          <Box>
            <h1 className='Title'>
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
        
          <Box>
          <h2 className="subTitle">Oque você deseja fazer?</h2>

          <form onSubmit={function handleCriarComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunity = {
                  title:dadosDoForm.get('title'),
                  imageUrl:dadosDoForm.get('image'),
                  creatorSlug: githubUser,
                }

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify(comunity)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunity = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })

              

               // const comunidadesAtualizada = [...comunidade,comunity];
                //setComunidade(comunidadesAtualizada);
          }}>
            <div>
            <input placeholder="Qual vai ser o nome da sua comunidade?" 
            name="title" 
            aria-label="Qual vai ser o nome da sua comunidade?"
            type="text"
            />
            </div>
            <div>
            <input placeholder="coloque uma url para usarmos de capa" 
            name="image" 
            aria-label="coloque uma url para usarmos de capa"
            />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
          </Box>
        </div>

        <div className="relations" style={{ gridArea: 'relations'}}>

        <ProfileRelationsBox title="seguidores" items={seguidores} />

        <ProfileRelationsBoxWrapper>
          <h2 className='smallTitle'>
            Comunidades ({comunidade.length})
          </h2>

        <ul>
          
        {comunidade.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
            <a href={`/communities/${itemAtual.id}`} >
              <img src={itemAtual.imageUrl} />
              <span>{itemAtual.title}</span>
            </a>
            </li>
          )
        })}
        </ul>
        </ProfileRelationsBoxWrapper>



        <ProfileRelationsBoxWrapper>

          <h2 className='smallTitle'>
            Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
        <ul>
        {pessoasFavoritas.map((itemAtual) => {
          return (
            <li key={itemAtual}>
            <a href={`/users/${itemAtual}`} >
              <img src={`https://github.com/${itemAtual}.png`} />
              <span>{itemAtual}</span>
            </a>
            </li>
          )
        })}
        </ul>
        </ProfileRelationsBoxWrapper>

        </div>

      
      
    </MainGrid>
    </>
  )
}
