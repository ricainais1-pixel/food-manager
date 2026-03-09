/** @type{import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true,
    },
    images:{
        domains:['Food-App.supabase.co'],
    },
}

module.exports = nextConfig
