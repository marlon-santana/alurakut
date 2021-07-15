

import  Box  from '../src/components/Box'
import  MainGrid  from '../src/components/MainGrid'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfilesRelations';
import { useState } from 'react';


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



export default function Home() {
  const githubUser = 'marlon-santana';
    const [comunidade, setComunidade] = useState([{
      id: '6365341654165416254126531625',
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
    }]);
  const pessoasFavoritas = ['juunegreiros',
  'omariosouto',
   'peas', 
   'rafaballerini', 
   'marcobrunodev',
  'felipefialho']

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
                  titel:dadosDoForm.get('title'),
                  image:dadosDoForm.get('image'),
                }

                const comunidadesAtualizada = [...comunidade,comunity];
                setComunidade(comunidadesAtualizada);
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

        <ProfileRelationsBoxWrapper>
        <ul>
        {comunidade.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
            <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
              <img src={itemAtual.image} />
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
