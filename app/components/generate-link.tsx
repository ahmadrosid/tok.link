import FormGenerate from "./form-generate";

export default function GenerateLink() {
  return (
    <div className="flex justify-center flex-col gap-4 w-full">
      <div className="text-center grid gap-2">
        <h1 className="text-5xl font-bold tracking-tight">Tok.link</h1>
        <p>The Best and The Shortest Link Shortener for known your audience!</p>
      </div>
      <FormGenerate />
    </div>
  );
}
