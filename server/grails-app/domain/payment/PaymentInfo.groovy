package payment

class PaymentInfo {

    String bankName //Название банка
    String bankIdentificationCode //БИК
    String payerAccountNumber //УНП
    String nceoNumber //ОКПО
    String checkingAccountNumber

    static constraints = {
        bankName size: 1..25
        bankIdentificationCode size: 1..9
        payerAccountNumber size: 9..9
        nceoNumber nullable: true
    }
}
