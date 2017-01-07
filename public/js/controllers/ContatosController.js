angular.module('contatooh').controller('ContatosController',
	function($scope,Contato){
		//$scope.total= 0;
		$scope.incrementa = function(){
			$scope.total++;
		};
		$scope.contatos = [];
		$scope.filtro = '';
		$scope.mensagem = {texto: ''}

	  function buscaContatos(){
			Contato.query(
				function(contatos){
					$scope.contatos = contatos;
					$scope.total = contatos.length;
				},
				function(erro){
					console.log("Não foi possível obter a lista de contatos");
					console.log(erro);
					$scope.mensagem = {texto: 'Não foi possível obter a lista'};
				}
			);
		}
		buscaContatos();

		$scope.remove = function(contato){
			Contato.delete({id: contato._id},
				buscaContatos,
				function(erro){
					console.log('Não foi possível remover o contato');
					$scope.mensagem = {texto: 'Não foi possível remover o contato'}
					console.log(erro);
				}
			);
		};
	});
