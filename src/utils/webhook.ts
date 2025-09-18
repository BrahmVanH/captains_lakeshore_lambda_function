// utils/triggerRebuild.ts
import https from 'https';

interface RebuildOptions {
  immediate?: boolean;
  metadata?: Record<string, unknown>;
}

class BuildTrigger {
  private static instance: BuildTrigger;
  private debounceTimeout: NodeJS.Timeout | null = null;
  private readonly webhookUrl: string;

  private constructor() {
    this.webhookUrl = process.env.NETLIFY_BUILD_HOOK_URL!;
    if (!this.webhookUrl) {
      throw new Error('NETLIFY_BUILD_HOOK_URL environment variable is required');
    }
  }

  static getInstance(): BuildTrigger {
    if (!BuildTrigger.instance) {
      BuildTrigger.instance = new BuildTrigger();
    }
    return BuildTrigger.instance;
  }

  async trigger(options: RebuildOptions = {}): Promise<void> {
    const { immediate = false, metadata } = options;

    if (immediate) {
      return this.executeRebuild(metadata);
    }

    // Debounce by default (30 seconds)
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.executeRebuild(metadata).catch(console.error);
    }, 30000);
  }

  private async executeRebuild(metadata?: Record<string, unknown>): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = new URL(this.webhookUrl);

      const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      };

      const req = https.request(options, (res) => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('Rebuild triggered successfully', metadata);
          resolve();
        } else {
          console.error('Failed to trigger rebuild:', res.statusCode);
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });

      req.on('error', reject);
      req.end();
    });
  }
}

// Export the simple function to use in resolvers
export const triggerRebuild = (options?: RebuildOptions): Promise<void> => {
  return BuildTrigger.getInstance().trigger(options);
};