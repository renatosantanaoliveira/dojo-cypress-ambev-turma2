describe("Teste de API", () => {
  const dojo = {
    aula: "API",
    duracao: 3,
    professor: "Renato",
  };

  it("validar dojo", () => {
    expect(dojo.aula).to.equal("API")
    expect(dojo.duracao).to.equal(3)
    expect(dojo.professor).to.equal("Renato")
  });

  const alunos = [
    { usuario: "william", cargo: "qa" }, //0
    { usuario: "Graciane", cargo: "qa" }, //1
  ];

  it("validar aluno", () => {
    expect(alunos[0].usuario).to.equal("william")
    expect(alunos[1].cargo).to.equal("qa")
  });
});
