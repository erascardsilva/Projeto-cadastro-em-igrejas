 const hoje = new Date();
        
        const nascimento = 19750929;
console.log(nascimento)
        let idade = hoje.getFullYear() - nascimento.getFullYear();

        const meses = hoje.getMonth() - nascimento.getMonth();

        
        
        if (meses < 0 || (meses === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
         }
         idade += meses / 12;
        console.log(idade)
        console.log(nascimento.getFullYear())
        