import { Footer, Header } from "src/components";

const PolicyPage = () => {
    return (
        <div>
            <Header />
            <div className="flex flex-col my-10 items-center p-6">
                <div className="w-full rounded-xl shadow-button">
                    <h3 className="w-full flex items-center justify-center border-b border-solid border-black text-primary font-bold text-3xl py-4">
                        Privacy Policy Guidelines
                    </h3>
                    <p className="p-6 text-[#979292] text-lg">
                        We are not going sell your data. We are not going to tolerate any explicit posts at all costs; such as: Violence against people, animals, and Properties. Showing nudity posts are prohibited at all costs, violators will be suspended and removed from our platform. All human races should find Gadel as a safe haven. Child nudity, explicit comments and posts are strictly prohibited . No user shall use this platform for human trafficking. User has the right to express his/her opinion with respect. No user will automatically remove from our platform for expressing his rights, his political opinions, views, and political parties. User shall not use our livestream platform to film and commit crimes. User shall not use Gadel to threat and track an other users. User must not share his credentials to other users. Any explicit videos, or websites, contents, contain viruses or involve in any cyber crime will be removed. We reserve the right to delete and suspended any comments, contents, posts, users who violate our terms and conditions .
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PolicyPage;