
import  Box  from '../src/components/Box'
import  MainGrid  from '../src/components/MainGrid'




export default function Home() {
  return (
    <MainGrid>
      <div className="profile" style={{ gridArea: 'profile'}}>
      <Box >
        <img src='https://github.com/marlon-santana.png'></img>
        </Box>
      </div>

        <div className="welcome" style={{ gridArea: 'welcome'}}>
          <Box>
            Bem vindo
          </Box>
        </div>

        <div className="relations" style={{ gridArea: 'relations'}}>
        <Box >
        Comunidade
        </Box>

        </div>
      
    </MainGrid>
  )
}
