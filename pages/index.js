
import  Box  from '../src/components/Box'
import  MainGrid  from '../src/components/MainGrid';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfilesRelations';


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

      
    </Box>
  )
}



export default function Home() {
  const githubUser = 'marlon-santana';
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
        </div>

        <div className="relations" style={{ gridArea: 'relations'}}>
        <Box >
        Comunidade
        </Box>

        <ProfileRelationsBoxWrapper>

          <h2 className='smallTitle'>
            Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
        <ul>
        {pessoasFavoritas.map((itemAtual) => {
          return (
            <li>
            <a href={`/users/${itemAtual}`} key={itemAtual}>
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
