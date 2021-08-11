// import { useRouter } from 'next/router';

const Index = () => {
  // const router = useRouter();

  return (
    <div>
      <p>hello</p>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      posts: 'aa',
    },
  };
}

export default Index;
