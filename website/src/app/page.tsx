import Scene from "@/components/Scene";
import Logo from "@/components/Logo";
import EnterButton from "@/components/EnterButton";

export default function Home() {
  return (
    <main className="entrance">
      <Scene />
      <div className="content">
        <Logo />
        <EnterButton />
      </div>
    </main>
  );
}
