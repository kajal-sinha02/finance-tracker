import Analytics from '@/components/Analytics';
import Navbar from '@/components/Navbar';
import DashboardAnalyticsBox from '@/components/DashboardAnalyticsBox';


export default function dashboard(){
    return(
        <>
             <Navbar />
            <div className="mt-16"> {/* Added margin above the box */}
                <DashboardAnalyticsBox />
            </div>
        </>
    );
}