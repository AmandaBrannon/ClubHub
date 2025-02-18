import Layout from '../components/layout';

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: '#1d1f21',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Layout>
        <div className="container py-5 text-white">
          <h1 className="text-center mb-4">Welcome to ClubHub</h1>
          <h2 className="text-center mb-4">
            Your one-stop shop for all UF clubs and events
          </h2>
          <div className="text-center mb-4">
            <pre
              style={{
                fontFamily: 'monospace',
                fontSize: '16px',
                lineHeight: '1.2',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              {`┏━━━━━━━━━━━━━━━━━━━━━━┓
┃                      ┃
┃        CLUBHUB       ┃
┃                      ┃
┃      (•‿•)          ┃
┃       /╲             ┃
┃      /  ╲            ┃
┃                      ┃
┃   Join the community ┃
┃                      ┃
┃━━━━━━━━━━━━━━━━━━━━━━┃
┃                      ┃
┃   Where clubs meet   ┃
┃     and connect!     ┃
┃                      ┃
┃       (ﾉ^_^)ﾉ        ┃
┃                      ┃
┃       Let's go!      ┃
┃                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━┛`}
            </pre>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
