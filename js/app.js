$(document).ready(function() {
    let itensCardapio = cardapio.metodos.obterItensCardapio();

    // Exemplo de como iterar pelos itens e anexá-los ao DOM
    for (let i = 0; i < itensCardapio.length; i++) {
        let item = itensCardapio[i];
        let temp = cardapio.templates.item
            .replace(/\${img}/g, item.img)
            .replace(/\${name}/g, item.name)
            .replace(/\${id}/g, item.id)
            .replace(/\${price}/g, item.price);

        $("#itensCardapio").append(temp);
    }
});


cardapio.metodos = {
    // Obtem a lista de itens json do cardapio
    obterItensCardapio:(categoria = 'burgers', verMais = false)=>{
        let filtro = MENU[categoria];
        if(!verMais){
            $("#itensCardapio").html('')
            $("#btnVerMais").removeClass('hidden')

        }
        
        $.each(filtro, (i, e)=>{

            let temp = cardapio.templates.item
            .replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${description}/g, e.dsc)
            .replace(/\${id}/g, e.id)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.',","));
            //botão ver mais clicado 12 itens

            if(!verMais && i < 100 ){
                $("#itensCardapio").append(temp)
            }
        })

        //remover o ativo após clicar no item
        $(".container-menu a").removeClass('active');
        //Setar menu para ativo
        $("#menu-" + categoria).addClass('active');
    },
}

cardapio.templates = {
    item: `
        <div class="col-12 col-sm-6 col-md-3 p-2">
            <div class="card card-item" id="\${id}">
                <div class="img-produto">
                    <img src="\${img}"/>
                </div>
                <div class="dados-produto">
                <p class="title-produto mt-4">
                <b>\${name}</b>
                </p>
                <p class="description">\${description}</p>
                <p class="price-produto">
                <b>R$ \${price}</b>
                </p>
                </div>
            </div>
        </div>
    `,
};

