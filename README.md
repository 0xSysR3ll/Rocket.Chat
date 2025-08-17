# Rocket.Chat FOSS Version

A community-maintained fork of Rocket.Chat with enterprise/premium features removed for self-hosting without licensing requirements.

> [!IMPORTANT]
> **This is NOT a pirated or cracked version of Rocket.Chat.** 
> 
> This is a legitimate fork of the open-source Rocket.Chat codebase where we've simply removed the enterprise/premium features that require licensing. We respect Rocket.Chat's business model and licensing terms.

This fork is intended for community use, small teams, open-source projects, personal use, self-hosting enthusiasts, and educational purposes.

> [!NOTE]
> If you need enterprise features like custom roles, advanced analytics, video conferencing, or enterprise support, please consider purchasing a Rocket.Chat Enterprise license to support the project.

## Getting Started

You'll need Docker, Docker Compose, and Node.js 22.16.0 for building. Make sure you have at least 4GB of RAM available.

### Quick Start (Recommended)

The easiest way to get started is with our quick-start script:

```bash
git clone <your-fork-url>
cd Rocket.Chat
./quick-start.sh
```

This will handle the entire setup process for you.

### Manual Setup

If you prefer to do it step by step:

```bash
git clone <your-fork-url>
cd Rocket.Chat
bash build-foss.sh
docker-compose -f docker-compose.foss.yml up -d
```

Then open http://localhost:3000 and login with `administrator` / `admin123`.

## What's Different

We've removed enterprise features that require licensing while keeping all the core chat functionality. The enterprise apps and packages have been removed, along with license management and validation. Premium features like custom roles and advanced analytics are also disabled.

What remains is a fully functional chat server with all the essential features you'd expect: real-time messaging, file sharing, user management, channels and direct messages, message search, user profiles, custom emojis, message reactions, threads, LDAP integration, OAuth providers, REST API access, and mobile/desktop apps.

## What's Not Available

> [!CAUTION]
> Enterprise features that require licensing are not available in this FOSS version.

This includes custom roles for creating custom permission sets, advanced analytics and detailed usage reports, video conferencing, enterprise SSO configurations, advanced livechat features, cloud hosting, and enterprise support.

## Docker Setup

The included docker-compose file sets up Rocket.Chat with MongoDB and handles the database replica set initialization. You can customize the setup by editing the environment variables in `docker-compose.foss.yml`:

```yaml
environment:
  - ADMIN_USERNAME=administrator
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASS=admin123
  - ROOT_URL=http://localhost:3000
  - MONGO_URL=mongodb://mongo:27017/rocketchat?replicaSet=rs0
```

## Building from Source

If you want to build manually instead of using the script:

```bash
yarn install
cd apps/meteor
meteor build --server-only --directory ../../bundle
cd ../../bundle/bundle/programs/server
npm install
docker build -f Dockerfile.foss -t rocketchat-foss:latest .
```

## Security Considerations

> [!WARNING]
> Remember to change the default admin password immediately after setup.

For production use, you should also set up HTTPS, regularly update the base image, consider using a reverse proxy like nginx or traefik, and backup your MongoDB data regularly.

## Contributing

This is a community project. If you find issues or want to improve the FOSS version, check existing issues first, test your changes thoroughly, and submit a pull request with a clear description. Always respect the original Rocket.Chat licensing.

## More Information

> [!TIP]
> For a detailed feature breakdown, see [FOSS-FEATURES.md](FOSS-FEATURES.md).

You can also visit the original Rocket.Chat at [rocket.chat](https://rocket.chat), check the documentation at [docs.rocket.chat](https://docs.rocket.chat), or join the community at [forums.rocket.chat](https://forums.rocket.chat).

## License

This fork maintains the same license as the original Rocket.Chat project. See the [LICENSE](LICENSE) file for details.

---

> [!NOTE]
> This is a community effort to make Rocket.Chat more accessible for self-hosting. If you find value in Rocket.Chat, consider supporting the project by purchasing enterprise licenses for your organization.
